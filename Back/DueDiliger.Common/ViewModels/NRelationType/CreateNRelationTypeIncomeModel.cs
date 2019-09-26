using System.ComponentModel.DataAnnotations;

namespace DueDiliger.Common.ViewModels.TaskType
{
    public class CreateNRelationTypeIncomeModel
    {
        [StringLength(512)]
        public string Name { get; set; }
    }
}