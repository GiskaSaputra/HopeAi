namespace HopeAi;

public interface IGeminiService
{
    public Task SetMessage(ModelAi model , string message);
    public Task<string> GetResponse();

    public bool IsConnected {get; set;}
}
