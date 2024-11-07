using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using dotenv.net;
using RovinoxDotnet.Interfaces;

namespace RovinoxDotnet.Service
{
    public class ImageRepository : IImageRepository
    {
        //  private readonly Cloudinary _cloudinary;
        //  public ImageRepository(Cloudinary cloudinary){
        //      _cloudinary = cloudinary;
        //  }
        public async Task<string> UploadAndGetImageUrlAsync(IFormFile imageFile)
        {
                    if (imageFile == null )
            {
                return null;
            }
             DotEnv.Load(options: new DotEnvOptions(probeForEnv: true));
             Cloudinary cloudinary = new Cloudinary(Environment.GetEnvironmentVariable("CLOUDINARY_URL"));
            cloudinary.Api.Secure = true;

            string url = " ";
            byte[] fileBytes;
            using (var stream = new MemoryStream())
            {
                imageFile.CopyTo(stream);
                fileBytes = stream.ToArray();
            }

            using (var uploadStream = new MemoryStream(fileBytes))
            {
                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(imageFile.FileName, uploadStream),
                };
                var result = await cloudinary.UploadAsync(uploadParams);

                url = result.Uri.AbsoluteUri;
            }

            return url;
        }

    }
}