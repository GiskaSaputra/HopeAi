using System.Net.Mime;
using System.Runtime.CompilerServices;
using GeminiDotnet;
using GeminiDotnet.V1;
using GeminiDotnet.V1.Models;


namespace HopeAi;


public struct ModelAi
{
    public string nameModel {get;set;}
}


public class GeminiService : IGeminiService
{

    public bool IsConnected {get;set;}

    readonly IConfiguration configuration; 


    readonly string APIKEY;

    private GenerateContentRequest _content; 


    private GeminiClient client;

    public GeminiService(IConfiguration _config , GeminiClientOptions _options)
    {
        configuration = _config;
        APIKEY = _config.GetSection("APIKEY").Value!;


        client = new GeminiClient(_options);
    }

    public async Task SetMessage(ModelAi model , string message)
    {
        var content = new GenerateContentRequest
        {
            Model = model.nameModel,
            Contents = new List<Content>
            {
                new Content
                {
                    Role = "user",
                    Parts = new List<Part>
                    {
                        new Part
                        {
                            Text = message
                        }
                    }
                }
            }
        };
    
        this._content = content;

    }

    public async Task<string> GetResponse()
    {
        try
        {
            var response = await client.V1.Models.GenerateContentAsync(this._content.Model, _content);
            return response.Candidates![0].Content!.Parts![0].Text!;
            
        }catch (Exception e)
        {
            return e.Message;
        }

    }

    

}
