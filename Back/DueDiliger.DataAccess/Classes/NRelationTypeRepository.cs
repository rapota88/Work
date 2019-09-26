using DueDiliger.Common.ViewModels.Global;
using DueDiliger.DataAccess.Data;
using DueDiliger.DataAccess.DBEntities;
using DueDiliger.DataAccess.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace DueDiliger.DataAccess.Classes
{
    public class NRelationTypeRepository : BaseRepository<RelationType>, INRelationTypeRepository
    {
       
        public NRelationTypeRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
        }

        public IQueryable<RelationType> GetList(GlobalFilteredPaginationIncomeModel model, Guid? companyId)
        {
            var filter = ParseFilter(model.Filter);
            Expression<Func<RelationType, bool>> condition = w => (w.CreatedByCompanyId == companyId || 
                                                                    _dbContext.Companies.Where(c => c.CreatedByCompanyId == companyId).Select(cc => cc.Id)
                                                                    .Contains(w.CreatedByCompanyId)) &&
                                                                   (filter.Name == string.Empty || w.Name.Contains(filter.Name));
            var nRelationTypes = _dbContext.NRelationTypes
                .Where(condition)
                .OrderByDescending(o => o.CreatedDate);
               
            return nRelationTypes;
        }

        public void InitBaseScopeOfRelationType(Guid companyId, Guid userId)
        {
            var nRelationTypes = new List<string> { "Investor", "Consultant" };

            foreach (var nRelationType in nRelationTypes)
            {
                _dbContext.NRelationTypes.Add(new RelationType
                {
                    CreatedByCompanyId = companyId,
                    CreatedById = userId,
                    CreatedDate = DateTime.Now,
                    ModifiedDate = DateTime.Now,
                    Name = nRelationType,
                });
            }

            _dbContext.SaveChanges();
        }
    }
}