using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;


namespace SpMedicalGroup.webApi
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddControllers()
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                    options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                });

            //Adicionando configura��es no Cors
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                  builder =>
                  {
                      builder.WithOrigins("http://localhost:3000")
                      .AllowAnyHeader()
                      .AllowAnyMethod();
                  }
                    );
            });

            //registrando um gerador de Sweagger, difinindo ou ou mais documentos
            services.AddSwaggerGen(c =>
            {
                //definindo nome do sweagger e a vers�o
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "SpMedicalGroup.webApi", Version = "v1" });
               

                // Set the comments path for the Swagger JSON and UI / isso tamb�m serve para ler os coment�rios dos m�todos
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });


            services
                .AddAuthentication(option =>
                {
                    option.DefaultAuthenticateScheme = "JwtBearer";
                    option.DefaultChallengeScheme = "JwtBearer";
                }
                )

                .AddJwtBearer("JwtBearer", options =>
                options.TokenValidationParameters = new TokenValidationParameters()
                {

                    // ser� validado emissor do token
                    ValidateIssuer = true,

                    //ser� validade endere�o do token
                    ValidateAudience = true,

                    //ser� vailidado tempo do token
                    ValidateLifetime = true,

                    //defini��o da chave de seguran�a
                    IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("UQIEUW-ORPOEWI-23854-023AKJD")),

                    //define o tempo de expira��o
                    ClockSkew = TimeSpan.FromHours(1),

                    //nome de emissor
                    ValidIssuer = "SpMedicalGroup.webApi",

                    //nome do destinat�rio
                    ValidAudience = "SpMedicalGroup.webApi"
                }
                );

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }




            //definindo o uso do sweagger
            app.UseSwagger();

            //construindo a middleware que vai fazer contato permintindo trazer os recursos do sweagger
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "SpMedicalGroup.webApi");
                c.RoutePrefix = string.Empty;
            });

            app.UseRouting();

            //definindo configura��o do cors
            app.UseCors("CorsPolicy");

            app.UseAuthentication();//403

            app.UseAuthorization(); //403


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
