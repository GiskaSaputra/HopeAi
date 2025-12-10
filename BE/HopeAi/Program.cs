using GeminiDotnet;
using HopeAi;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton(new GeminiClientOptions
{
    ApiKey = builder.Configuration.GetSection("APIKEY").Value!
});

builder.Services.AddSingleton<IGeminiService , GeminiService>();
builder.Services.AddSingleton<IOcrService,OcrService>();

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("cors" , policy =>
    {
        policy.AllowAnyHeader(); 
        policy.AllowAnyMethod();
        policy.AllowAnyOrigin();
    });
});

Console.WriteLine(Environment.GetEnvironmentVariable("APIKEY"));

var app = builder.Build();

app.MapControllers();

app.UseCors("cors");

app.Run();