using System.Web.Mvc;
using System.Web.Routing;
using thewall9.web.parent;

namespace thewall9.web
{
    public class MvcApplication : Thewall9Application
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
    }
}
