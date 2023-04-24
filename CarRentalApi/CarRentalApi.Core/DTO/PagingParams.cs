﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CarRentalApi.Core.Contracts;

namespace CarRentalApi.Core.DTO
{
    public class PagingParams : IPagingParams
    {
        public int PageSize { get; set; } = 10;
        public int PageNumber { get; set; } = 1;
        public string SortColumn { get; set; } = "Id";
        public string SortOrder { get; set; } = "ASC";
    }
}
