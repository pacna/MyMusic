using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Api.Music
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                    webBuilder.UseUrls("http://*:5000");
                });

        // public static void DBStuff()
        // {
        //     MongoClient dbClient = new MongoClient("mongodb://localhost:27017/music");
        //     var dbList = dbClient.GetDatabase("music");
        //     var collection = dbList.GetCollection<BsonDocument>("music");
        //     Console.WriteLine("The list of databases on this server is: ");
        //     foreach (var db in collection.Find(new BsonDocument()))
        //     {
        //         Console.WriteLine("HI !!!!!!!!!!!!!!!");
        //         Console.WriteLine(db);
        //     }
        // }
    }
}
