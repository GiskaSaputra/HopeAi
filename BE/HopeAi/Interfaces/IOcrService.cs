namespace HopeAi;

public interface IOcrService
{
    public Task SetImage(IFormFile image);
    public Task<string> OcrResults(string model);
}
