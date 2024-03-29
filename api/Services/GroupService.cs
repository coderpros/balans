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

        public Models.Group GetGroup(string id) => 
            _groups.Find<Group>(group => group.Id == id).FirstOrDefault();

            public Group Create(Models.Group group)
        {
            group.Id = MongoDB.Bson.ObjectId.GenerateNewId().ToString();

            if(_groups.CountDocuments(g => g.AzId == group.AzId && g.GroupName == group.GroupName) < 1)
            {
                _groups.InsertOne(group);
            }

            return group;
        }
    }
}