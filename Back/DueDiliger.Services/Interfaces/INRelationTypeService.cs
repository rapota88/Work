using System;
using DueDiliger.Common.ViewModels.Global;
using DueDiliger.Common.ViewModels.TaskType;

namespace DueDiliger.Services.Interfaces
{
    public interface INRelationTypeService
    {
        PaginatedListViewModel<NRelationTypeViewModel> GetList(GlobalFilteredPaginationIncomeModel model, Guid? companyId);

        NewlyCreatedObjectId Create(CreateNRelationTypeIncomeModel model, Guid? companyId, Guid userId);
        
        void Update(UpdateNRelationTypeIncomeModel model, Guid? companyId);

        void Delete(DeleteObjectsIncomeModel model, Guid? companyId);
    }
}