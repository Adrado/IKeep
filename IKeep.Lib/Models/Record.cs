﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Configuration;
using IKeep.Lib.Core;
using Newtonsoft.Json;

namespace IKeep.Lib.Models
{
    public class Record : Entity
    {
        public DateTime CreatedDate { get; set; }
        public string Name { get; set; }
        public int Downloads { get; set; }
        public string Description { get; set; }
        [JsonIgnore]
        public string Extension { get; set; }
        [JsonIgnore]
        public string HashData { get; set; }



        //// PROPIEDADES PRIVADAS
        //public string PathRelativo
        //{
        //    get
        //    {
        //        return ConfigurationManager.AppSettings["PathArchivos"] +
        //                                    Id.ToString() + "." +
        //                                    Extension;
        //    }
        //}

        //public string PathCompleto
        //{
        //    get
        //    {
        //        var _PathAplicacion = HttpContext.Current.Request.PhysicalApplicationPath;
        //        return Path.Combine(_PathAplicacion, this.PathRelativo);
        //    }
        //}

        //// MÉTODOS PÚBLICOS
        //public void SubirArchivo(byte[] archivo)
        //{
        //    File.WriteAllBytes(this.PathCompleto, archivo);
        //}

        //public byte[] DescargarArchivo()
        //{
        //    return File.ReadAllBytes(this.PathCompleto);
        //}

        //public void EliminarArchivo()
        //{
        //    File.Delete(this.PathCompleto);
        //}
    }
}


//http://www.rafaelacosta.net/Blog/2018/7/30/c%C3%B3mo-subir-archivos-al-servidor-en-una-aplicaci%C3%B3n-aspnet-mvc