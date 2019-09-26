using System;
using System.ComponentModel.DataAnnotations;

namespace DueDiliger.Common.ViewModels.TaskType
{
    public class UpdateNRelationTypeIncomeModel
    {
        public Guid Id { get; set; }

        [StringLength(128)]
        public string Name { get; set; }
    }
}