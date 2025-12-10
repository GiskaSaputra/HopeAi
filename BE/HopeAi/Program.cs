using GeminiDotnet;
using HopeAi;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<IGeminiService , GeminiService>();
builder.Services.AddScoped<IOcrService,OcrService>();

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


var app = builder.Build();

app.MapControllers();

app.UseCors("cors");

app.Run();