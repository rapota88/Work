using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using DueDiliger.DataAccess.DBEntities.BaseClasses;

namespace DueDiliger.DataAccess.DBEntities
{
    public class RelationType : BaseEntity
    {
        [StringLength(512)]
        public string Name { get; set; }

        public Guid CreatedByCompanyId { get; set; }

        public virtual Company CreatedByCompany { get; set; }

        public virtual AppUser CreatedBy { get; set; }

        public virtual ICollection<Company> Companies { get; set; }

        public override string ToString()
        {
            return Name;
        }
    }
}
