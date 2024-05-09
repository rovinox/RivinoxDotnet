using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ExcelDataReader;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.VisualBasic;
using RovinoxDotnet.DTOs.Curriculum;
using RovinoxDotnet.Interfaces;

namespace RovinoxDotnet.Controllers
{
    [Route("api/curriculum")]
    [ApiController]
    public class CurriculumController : ControllerBase
    {
        private readonly ICurriculumRepository _curriculumRepository;
        public CurriculumController(ICurriculumRepository curriculumRepository)
        {
            _curriculumRepository = curriculumRepository;
        }
        [HttpGet("batch/{batchId:int}")]
        public async Task<IActionResult> GetAll([FromRoute] int batchId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var curriculums = await _curriculumRepository.GetAllByBatchIdAsync(batchId);
            return Ok(curriculums);
        }
        [HttpPost]
        // [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateCurriculumDto curriculumDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var curriculum = await _curriculumRepository.CreateAsync(curriculumDto);
            return Ok(curriculum);
            // return CreatedAtAction(nameof(GetById), new { id = commentModel.Id }, commentModel.ToCommentDto());
        }
        // [HttpPost("upload/{batchId:int}")]
        // public async Task<IActionResult> UpLoadExcel ( [FromRoute] int batchId, [FromBody] IFormFile excelFile)
        // {

        //     if (!ModelState.IsValid)
        //     {
        //         return BadRequest(ModelState);
        //     }
            
        //            var excelData = new List<List<object>>();
        //      // Upload File
        //     if (excelFile != null && excelFile.Length > 0)
        //     {
        //         var uploadDirectory = $"{Directory.GetCurrentDirectory()}\\Uploads";

        //         if (!Directory.Exists(uploadDirectory))
        //         {
        //             Directory.CreateDirectory(uploadDirectory);
        //         }

        //         var filePath = Path.Combine(uploadDirectory, excelFile.FileName);

        //         using (var stream = new FileStream(filePath, FileMode.Create))
        //         {
        //             await excelFile.CopyToAsync(stream);
        //         }

        //         //Read File
        //         using (var stream = System.IO.File.Open(filePath, FileMode.Open, FileAccess.Read))
        //         {
             
        //             using (var reader = ExcelReaderFactory.CreateReader(stream))
        //             {
        //                 do
        //                 {
        //                     while (reader.Read())
        //                     {
        //                         var rowData = new List<object>();
        //                         for (int column = 0; column < reader.FieldCount; column++)
        //                         {
        //                             rowData.Add(reader.GetValue(column));
        //                         }
        //                         excelData.Add(rowData);
        //                     }
        //                 } while (reader.NextResult());

        //             }
        //         }
        //     }
        //     var curriculum = await _curriculumRepository.CreateFromExcelByBatchIdAsync(batchId, excelFile);
        //     return Ok(curriculum);
        // }
    }
}