using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using GeminiDotnet;
using GeminiDotnet.V1;
using GeminiDotnet.V1.Models;
using Microsoft.AspNetCore.Mvc.Formatters;

namespace HopeAi;

public class OcrService : IOcrService
{

    private byte[] _bytesImage { get; set; }
    private string? _contentType { get; set; }

    private HttpClient _client = new HttpClient();
    public string APIKEY { get; set; }

    public GeminiClient geminiClient { get; set; }
    public OcrService(IConfiguration configuration)
    {
        APIKEY = configuration.GetSection("OCRKEY").Value!;
        geminiClient = new GeminiClient(new GeminiClientOptions
        {
            ApiKey = APIKEY
        });
    }

    public async Task SetImage(IFormFile image)
    {
        if (image == null || image.Length == 0) throw new Exception("File tidak valid");
        using var ms = new MemoryStream();
        await image.CopyToAsync(ms);
        _bytesImage = ms.ToArray();
        _contentType = image.ContentType;
    }

    public async Task<string> OcrResults(string model)
    {
        if (_bytesImage == null) throw new Exception("File tidak valid");
        string base64 = Convert.ToBase64String(_bytesImage);

        var payload = new List<Content>
        {
            new Content
            {
                Role = "user",
                Parts = new List<Part>
                {
                    new Part
                    {
                        Text = "Extract all readable text from this image. Return raw text only."
                        
                    },

                    new Part
                    {
                        InlineData = new Blob
                        {
                            MimeType = _contentType,
                            Data = Convert.FromBase64String(base64)
                        }
                    }
                }
            }
        };

        var content = new GenerateContentRequest
        {
            Model = model,
            Contents = payload
        };

        try
        {
            var response = await geminiClient.V1.Models.GenerateContentAsync(model, content);

            var result = response.Candidates![0].Content!.Parts![0].Text;
            return result!;
        }
        catch (Exception e)
        {
            return e.Message;
        }
    }
}
