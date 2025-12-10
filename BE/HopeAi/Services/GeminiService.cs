using System.Net.Mime;
using System.Runtime.CompilerServices;
using GeminiDotnet;
using GeminiDotnet.V1;
using GeminiDotnet.V1.Models;


namespace HopeAi;


public struct ModelAi
{
    public string nameModel { get; set; }
}


public class GeminiService : IGeminiService
{

    public bool IsConnected { get; set; }

    readonly IConfiguration configuration;


    readonly string APIKEY;

    private string _model;


    private GeminiClient client;

    private List<Content> _history = new();

    public GeminiService(IConfiguration _config)
    {
        configuration = _config;
        APIKEY = _config.GetSection("APIKEY").Value!;
        Console.Write(APIKEY);
        client = new GeminiClient(new GeminiClientOptions
        {
            ApiKey = APIKEY
        });
    }

    public async Task SetMessage(ModelAi model, string message)
    {
        _model = model.nameModel;

        _history.Add(
            new Content
            {
                Role = "user",
                Parts = new List<Part>
                {
                    new Part
                    {
                        Text = @"Nama mu adalah Neotutor , Kamu adalah tutor belajar yang sangat ramah, sabar, dan komunikatif.
                        Jawablah dengan:
                        - Bahasa sederhana
                        - Kalimat pendek
                        - Contoh konkret bila perlu
                        - Tidak bertele-tele
                        - Berorientasi pada pemahaman pelajar
                        - Jelaskan konsep dengan cara paling mudah dipahami
                        - Usahakan ala Gen z supaya pembicaraan tidak terlalu kaku

                        Jika pertanyaan terlalu luas, jelaskan dengan ringkas dan beri langkah-langkah. " + message
                    }
                }
            }
        );

    }

    public async Task<string> GetResponse()
    {
        var content = new GenerateContentRequest
        {
            Model = _model,
            Contents = _history
        };

        try
        {
            var response = await client.V1.Models.GenerateContentAsync(_model, content);
            return response.Candidates![0].Content!.Parts![0].Text!;

        }
        catch (Exception e)
        {
            return e.Message;
        }

    }



}
