using AssetTree_Tool.Models.Entity;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace AssetTree_Tool.DataAccess;

public class AppDBContext: DbContext
{
    public AppDBContext(DbContextOptions<AppDBContext> options): base(options) { }

    public DbSet<Asset> Assets { get; set; }

    public DbSet<AssetDetail> Asset_Details { get; set; }   

}
