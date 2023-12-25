﻿using System;
using YamlDotNet.Serialization;
using System.IO;


namespace CourseWork.Server
{
    public  class DatabaseConfig
    {
        public string user { get; set; }
        public string host { get; set; }
        public string database { get; set; }
        public string password { get; set; }
        public int port { get; set; }
        private static string _configPath = "database.yaml";

        public static string GetConnectionString()
        {
            var deserializer = new DeserializerBuilder().Build();
            string yaml = File.ReadAllText(_configPath);
            var config = deserializer.Deserialize<DatabaseConfig>(yaml);
            Console.WriteLine($"Host={config.host};Username={config.user};Password={config.password};Database={config.database};Port={config.port}");

            return $"Host={config.host};Username={config.user};Password={config.password};Database={config.database};Port={config.port}";
        }
    }
}
