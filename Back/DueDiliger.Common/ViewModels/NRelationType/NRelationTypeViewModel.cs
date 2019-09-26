using System;

namespace DueDiliger.Common.ViewModels.TaskType
{
    public class NRelationTypeViewModel
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public bool IsDeletable { get; set; }

        public DateTime CreatedDate { get; set; }

        public string CreatedBy { get; set; }

        public Guid CreatedById { get; set; }
    }
}