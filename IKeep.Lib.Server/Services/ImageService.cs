using IKeep.Lib.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Drawing;
using System.Web;
using System.Drawing.Imaging;

namespace IKeep.Lib.Server.Services
{
    public class ImageService : IImageService
    {
        public string HashImage(string input)
        {
            string data = input.Substring(input.IndexOf(',') + 1);

            var bytes = Convert.FromBase64String(data);

            string hash;
            using (var sha1 = new SHA1CryptoServiceProvider())
            {
                hash = Convert.ToBase64String(sha1.ComputeHash(bytes));
                hash = string.Concat(hash.ToCharArray().Where(x => char.IsLetterOrDigit(x)));
            }

            using (var ms = new MemoryStream(bytes))
            {
                var img = Image.FromStream(ms);
                img.Save("Images/" + hash + ".png", ImageFormat.Png);
            }

            return HttpUtility.UrlEncode(hash);
        }
    }
}
