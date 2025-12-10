using HopeAi;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyApp.Namespace
{
    [Route("/scan/")]
    [ApiController]
    public class OcrController : ControllerBase
    {   
        readonly IOcrService ocrService;
        public OcrController(IOcrService _service)
        {
            ocrService = _service;
        }

        [HttpPost("ocr")]
        public async Task<IActionResult> GetOcrResult([FromForm]IFormFile image)
        {
            await ocrService.SetImage(image);
            string res = await ocrService.OcrResults("gemini-2.5-flash");
            return Ok(res);
        }
    }
}
