using IKeep.Lib.Core;
using IKeep.Lib.DA.EFCore;
using IKeep.Lib.DAL;
using IKeep.Lib.Models;
using IKeep.Lib.Server.Services;
using IKeep.Lib.Services;
using IKeep.Lib.Services.Dtos;
using IKeep.Lib.Services.Interfaces;
using IKeep.Web.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace IKeep.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            // configure jwt authentication
            var appSettings = appSettingsSection.Get<AppSettings>();

            services.AddDbContext<IKeepContext>(options => options.UseLazyLoadingProxies()
            .UseSqlServer(appSettings.DbConnection,
                b => b.MigrationsAssembly("IKeep.Web")));

            InjectDependencies(services);

            // configure jwt authentication
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }


        public void InjectDependencies(IServiceCollection services)
        {
            // DbSets
            services.AddScoped<IDbSet<Area>, AreasDbSet>();
            services.AddScoped<IDbSet<Building>, BuildingsDbSet>();
            services.AddScoped<IDbSet<Category>, CategoriesDbSet>();
            services.AddScoped<IDbSet<Corrective>, CorrectivesDbSet>();
            services.AddScoped<IDbSet<Element>, ElementsDbSet>();
            services.AddScoped<IDbSet<ElementObservation>, ElementObservationsDbSet>();
            services.AddScoped<IDbSet<ElementType>, ElementTypesDbSet>();
            services.AddScoped<IDbSet<ElementGenericChore>, ElementGenericChoresDbSet>();
            services.AddScoped<IDbSet<Floor>, FloorsDbSet>();
            services.AddScoped<IDbSet<FormatLabel>, FormatLabelsDbSet>();
            services.AddScoped<IDbSet<FormatValue>, FormatValuesDbSet>();
            services.AddScoped<IDbSet<GenericElement>, GenericElementsDbSet>();
            services.AddScoped<IDbSet<GenericElementGenericChore>, GenericElementGenericChoresDbSet>();
            services.AddScoped<IDbSet<GenericChore>, GenericChoresDbSet>();
            services.AddScoped<IDbSet<GenericChoreFormatLabel>, GenericChoreFormatLabelsDbSet>();
            services.AddScoped<IDbSet<Inspection>, InspectionsDbSet>();
            services.AddScoped<IDbSet<Installation>, InstallationsDbSet>();
            services.AddScoped<IDbSet<InstallationUser>, InstallationUsersDbSet>();
            services.AddScoped<IDbSet<Map>, MapsDbSet>();
            services.AddScoped<IDbSet<Observation>, ObservationsDbSet>();
            services.AddScoped<IDbSet<Priority>, PrioritiesDbSet>();
            services.AddScoped<IDbSet<Report>, ReportsDbSet>();
            services.AddScoped<IDbSet<Role>, RolesDbSet>();
            services.AddScoped<IDbSet<Supplier>, SuppliersDbSet>();
            services.AddScoped<IDbSet<Chore>, ChoresDbSet>();
            services.AddScoped<IDbSet<User>, UsersDbSet>();

            // Repositories
            services.AddScoped<IRepository<Area>, GenericRepository<Area>>();
            services.AddScoped<IRepository<Building>, GenericRepository<Building>>();
            services.AddScoped<IRepository<Category>, GenericRepository<Category>>();
            services.AddScoped<IRepository<Corrective>, GenericRepository<Corrective>>();
            services.AddScoped<IRepository<Element>, GenericRepository<Element>>();
            services.AddScoped<IRepository<ElementType>, GenericRepository<ElementType>>();
            services.AddScoped<IRepository<ElementGenericChore>, GenericRepository<ElementGenericChore>>();
            services.AddScoped<IRepository<Floor>, GenericRepository<Floor>>();
            services.AddScoped<IRepository<FormatLabel>, GenericRepository<FormatLabel>>();
            services.AddScoped<IRepository<FormatValue>, GenericRepository<FormatValue>>();
            services.AddScoped<IRepository<GenericElement>, GenericRepository<GenericElement>>();
            services.AddScoped<IRepository<GenericElementGenericChore>, GenericRepository<GenericElementGenericChore>>();
            services.AddScoped<IRepository<GenericChore>, GenericRepository<GenericChore>>();
            services.AddScoped<IRepository<GenericChoreFormatLabel>, GenericRepository<GenericChoreFormatLabel>>();
            services.AddScoped<IRepository<Inspection>, GenericRepository<Inspection>>();
            services.AddScoped<IRepository<Installation>, GenericRepository<Installation>>();
            services.AddScoped<IRepository<InstallationUser>, GenericRepository<InstallationUser>>();
            services.AddScoped<IRepository<Map>, GenericRepository<Map>>();
            services.AddScoped<IRepository<Observation>, GenericRepository<Observation>>();
            services.AddScoped<IRepository<Priority>, GenericRepository<Priority>>();
            services.AddScoped<IRepository<Report>, GenericRepository<Report>>();
            services.AddScoped<IRepository<Role>, GenericRepository<Role>>();
            services.AddScoped<IRepository<Supplier>, GenericRepository<Supplier>>();
            services.AddScoped<IRepository<Chore>, GenericRepository<Chore>>();
            services.AddScoped<IRepository<User>, GenericRepository<User>>();

            // Crud Services
            services.AddScoped<ICrudService<Area>, GenericCrudService<Area>>();
            services.AddScoped<ICrudService<Building>, GenericCrudService<Building>>();
            services.AddScoped<ICrudService<Category>, GenericCrudService<Category>>();
            services.AddScoped<ICrudService<Corrective>, GenericCrudService<Corrective>>();
            services.AddScoped<ICrudService<User>, GenericCrudService<User>>();
            services.AddScoped<ICrudService<Element>, GenericCrudService<Element>>();
            services.AddScoped<ICrudService<ElementType>, GenericCrudService<ElementType>>();
            services.AddScoped<ICrudService<ElementGenericChore>, GenericCrudService<ElementGenericChore>>();
            services.AddScoped<ICrudService<Floor>, GenericCrudService<Floor>>();
            services.AddScoped<ICrudService<FormatLabel>, GenericCrudService<FormatLabel>>();
            services.AddScoped<ICrudService<FormatValue>, GenericCrudService<FormatValue>>();
            services.AddScoped<ICrudService<GenericElement>, GenericCrudService<GenericElement>>();
            services.AddScoped<ICrudService<GenericElementGenericChore>, GenericCrudService<GenericElementGenericChore>>();
            services.AddScoped<ICrudService<GenericChore>, GenericCrudService<GenericChore>>();
            services.AddScoped<ICrudService<GenericChoreFormatLabel>, GenericCrudService<GenericChoreFormatLabel>>();
            services.AddScoped<ICrudService<Inspection>, GenericCrudService<Inspection>>();
            services.AddScoped<ICrudService<Installation>, GenericCrudService<Installation>>();
            services.AddScoped<ICrudService<InstallationUser>, GenericCrudService<InstallationUser>>();
            services.AddScoped<ICrudService<Map>, GenericCrudService<Map>>();
            services.AddScoped<ICrudService<Observation>, GenericCrudService<Observation>>();
            services.AddScoped<ICrudService<Priority>, GenericCrudService<Priority>>();
            services.AddScoped<ICrudService<Report>, GenericCrudService<Report>>();
            services.AddScoped<ICrudService<Role>, GenericCrudService<Role>>();
            services.AddScoped<ICrudService<Supplier>, GenericCrudService<Supplier>>();
            services.AddScoped<ICrudService<Chore>, GenericCrudService<Chore>>();

            // Other Services
            services.AddScoped<ITreeViewService, TreeViewService>();
            services.AddScoped<IGenerateChoresService, GenerateChoresService>();
            services.AddScoped<IGetElementsService, GetElementsService>();
            services.AddScoped<IFormatService, FormatService>();
            services.AddScoped<IPartialReportService, PartialReportService>();

            //services.AddScoped<IRegisterService, RegisterService>();
            //services.AddScoped<ILoginService, JwtLoginService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
