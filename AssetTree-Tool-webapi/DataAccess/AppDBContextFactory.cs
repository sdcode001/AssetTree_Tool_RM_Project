using Microsoft.EntityFrameworkCore;

namespace AssetTree_Tool.DataAccess;

public class AppDBContextFactory
{
    public AppDBContext CreateDBContext(string connectionString)
    {
        var optionsBuilder = new DbContextOptionsBuilder<AppDBContext>();
        optionsBuilder.UseNpgsql(connectionString);
    
        return new AppDBContext(optionsBuilder.Options);
    }

}
