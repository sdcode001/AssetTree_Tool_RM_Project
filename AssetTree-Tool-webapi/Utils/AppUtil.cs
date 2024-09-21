namespace AssetTree_Tool.Utils;

public class AppUtil
{
    public static string buildDBConnectionString(string HOST_IP, string PORT, string DATABASE, string USERNAME, string PASSWORD)
    {
        return string.Format("Host={0};Port={1};Database={2};Username={3};Password={4};Pooling=false;MinPoolSize=1;MaxPoolSize=100;ConnectionLifeTime=0;CommandTimeout=300;Timeout=300;", HOST_IP, PORT, DATABASE, USERNAME, PASSWORD);
    }
}
