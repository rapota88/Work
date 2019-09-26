using System;
using System.Linq;
using DueDiliger.Common.Exceptions;
using DueDiliger.Common.StaticResource;
using DueDiliger.Common.ViewModels.Global;
using DueDiliger.Common.ViewModels.TaskType;
using DueDiliger.DataAccess.DBEntities;
using DueDiliger.DataAccess.Interfaces;
using DueDiliger.Services.Interfaces;

namespace DueDiliger.Services.Classes
{
    public class NRelationTypeService : INRelationTypeService
    {
        private readonly INRelationTypeRepository _nRelationTypeRepository;
        private readonly ICompanyRepository _companyRepository;

        public NRelationTypeService(INRelationTypeRepository nRelationTypeRepository, ICompanyRepository companyRepository)
        {
            _nRelationTypeRepository = nRelationTypeRepository;
            _companyRepository = companyRepository;
        }
        public PaginatedListViewModel<NRelationTypeViewModel> GetList(GlobalFilteredPaginationIncomeModel model, Guid? companyId)
        {
            var nRelationTypes = _nRelationTypeRepository.GetList(model, companyId).Select(nr => new NRelationTypeViewModel
            {
                Id = nr.Id,
                Name = nr.Name,
                IsDeletable = !nr.Companies.Any(),
                CreatedDate = nr.CreatedDate,
                CreatedBy = $"{nr.CreatedBy.FirstName} {nr.CreatedBy.LastName}",
                CreatedById = nr.CreatedById,
            });

            return _nRelationTypeRepository.Pagination(nRelationTypes, model);
        }         

        public NewlyCreatedObjectId Create(CreateNRelationTypeIncomeModel model, Guid? companyId, Guid userId)
        {
            var companiesId = _companyRepository.GetAll().Where(c => c.CreatedByCompanyId == companyId).Select(cc => cc.Id).ToList();

            if (_nRelationTypeRepository.Any(nr => nr.Name == model.Name && (nr.CreatedByCompanyId == companyId ||
                                                companiesId.Contains(nr.CreatedByCompanyId)))
            )
            {
                throw new AlreadyExistException();
            }

            var dbNRelationType = new RelationType
            {
                CreatedById = userId,
                CreatedByCompanyId = companyId.GetValueOrDefault(Guid.Empty),
                CreatedDate = DateTime.Now,
                Name = model.Name,
                ModifiedDate = DateTime.Now,
            };

            _nRelationTypeRepository.Add(dbNRelationType);

            return new NewlyCreatedObjectId(dbNRelationType.Id);
        }

        public void Update(UpdateNRelationTypeIncomeModel model, Guid? companyId)
        {
            var companiesId = _companyRepository.GetAll().Where(c => c.CreatedByCompanyId == companyId).Select(cc => cc.Id).ToList();

            if (_nRelationTypeRepository.Any(nr => nr.Id != model.Id && nr.Name == model.Name &&
                                             (nr.CreatedByCompanyId == companyId ||
                                               companiesId.Contains(nr.CreatedByCompanyId)))
            )
            {
                throw new AlreadyExistException();
            }

            var dbNRelationType = _nRelationTypeRepository.GetSingle(nr => nr.Id == model.Id);

            if (dbNRelationType == null)
                throw new ObjectNotFoundException();

            dbNRelationType.Name = model.Name;

            _nRelationTypeRepository.Update(dbNRelationType);
        }

        public void Delete(DeleteObjectsIncomeModel model, Guid? companyId)
        {
            var dbNRelationTypes = _nRelationTypeRepository
                .GetAll(nr => model.Ids.Contains(nr.Id));

            if (dbNRelationTypes.Count != model.Ids.Count)
                throw new ObjectNotFoundException();

            if (dbNRelationTypes.Any(t => t.CreatedByCompanyId != companyId))
                throw new NonAccessibleResourceException();

            dbNRelationTypes = dbNRelationTypes.Where(nr => !nr.Companies.Any()).ToList();

            var isExceptionThrown = dbNRelationTypes.Count != model.Ids.Count;

            _nRelationTypeRepository.RemoveRange(dbNRelationTypes);

            if (isExceptionThrown)
                throw new BoundedObjectsException($"{StaticResource.BindedEntities} Tasks");
        }    
    }
}