using DueDiliger.Common.ViewModels.Global;
using DueDiliger.DataAccess.DBEntities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DueDiliger.DataAccess.Interfaces
{
    public interface INRelationTypeRepository : IRepository<RelationType>
    {
        IQueryable<RelationType> GetList(GlobalFilteredPaginationIncomeModel model, Guid? companyId);

        void InitBaseScopeOfRelationType(Guid companyId, Guid userId);
    }
}