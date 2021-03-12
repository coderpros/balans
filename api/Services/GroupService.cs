namespace Books.Api.Services
{
    using System.Collections.Generic;
    using System.Linq;

    using Books.Api.Models;
    using MongoDB.Driver;

    public class GroupService
    {
        private readonly IMongoCollection<Models.Group> _groups;

        public GroupService(IBookstoreDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _groups = database.GetCollection<Models.Group>(settings.GroupsCollectionName);
        }

        public List<Models.Group> Get() =>
            _groups.Find(group => true).ToList();

        public List<Models.Group> Get(string id) =>
            _groups.Find<Group>(group => group.AzId == id).ToList();
    }
}