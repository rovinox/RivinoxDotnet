using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RovinoxDotnet.Interfaces
{
    public interface IImageRepository
    {
        public Task<string> UploadAndGetImageUrlAsync(IFormFile imageFile);
    }
}