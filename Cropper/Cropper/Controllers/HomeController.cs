using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Cropper.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpPost]
        public ActionResult SaveImage(string imageBase64)
        {
            string name=String.Empty;
            for (int i = 0; i <= 85; i++)
            {
                name = Guid.NewGuid() + ".jpeg";
                string path = Server.MapPath("~/Images/") + name;

                byte[] imageBytes = Convert.FromBase64String(imageBase64);

                using (var ms = new MemoryStream(imageBytes, 0, imageBytes.Length))
                {
                    Image image = Image.FromStream(ms, true);

                    image.Save(path, ImageFormat.Jpeg);
                }
            }
            return Json(new { success = true, responseText=Url.Content("~/Images/")+name}, JsonRequestBehavior.AllowGet);
        }
    }
}