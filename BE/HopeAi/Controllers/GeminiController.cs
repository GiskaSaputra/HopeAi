using GeminiDotnet;
using HopeAi;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyApp.Namespace
{
    [Route("/gemini/")]
    [ApiController]
    public class GeminiController : ControllerBase
    {
        readonly IGeminiService _client; 

        public GeminiController(IGeminiService client)
        {
            _client = client;
        }

        [HttpPost("chat")]
        public IActionResult GetResponses([FromBody] Message message)
        {
            _client.SetMessage(new ModelAi
            {
                nameModel = "gemini-2.5-flash"
            } ,
            message.text);

            string response = _client.GetResponse().Result;

            if (string.IsNullOrEmpty(response))
            {
                return StatusCode(400 , "Objek tidak ada");
            }

            return Ok(response);
        }

    }


    public struct Message
    {
        public string text{get;set;}
    }
}
