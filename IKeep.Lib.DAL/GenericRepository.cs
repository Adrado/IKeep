using IKeep.Lib.Core;
using System;
using System.Linq;

namespace IKeep.Lib.DAL
{
    public class GenericRepository<T> : IRepository<T> where T : Entity
    {
        public IDbSet<T> DbSet { get; set; }

        public GenericRepository(IDbSet<T> dbSet)
        {
            DbSet = dbSet;
        }

       
        public virtual T Add(T entity)
        {
            if (entity.Id == default)
            {
                entity.Id = Guid.NewGuid();
            }
            else if (DbSet.GetAll().Any(x => x.Id == entity.Id))
            {
                throw new Exception("entity with this Id already exists");
            }

            return DbSet.Add(entity);
        }


        public IQueryable<T> GetAll()
        {
            return DbSet.GetAll();
        }

    
        public T Update(T entity)
        {
            if (entity.Id == default)
            {
                throw new Exception("entity with id null cannot be updated");
            }
            else if (DbSet.GetAll().All(x => x.Id != entity.Id))
            {
                throw new Exception("entity not found");
            }

            return DbSet.Update(entity);
        }

        public bool Delete(Guid id)
        {
            if (id == default)
            {
                throw new Exception("entity with this Id already exists");
            }
            else if (DbSet.GetAll().All(x => x.Id != id))
            {
                throw new Exception("there is no entity with this Id");
            }

            return DbSet.Delete(id);
        }
    }
}
