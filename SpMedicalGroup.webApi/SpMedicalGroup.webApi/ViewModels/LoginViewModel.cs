﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.webApi.ViewModels
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "O campo é obrigatório !")]
        public string Email { get; set; }
        
        [Required(ErrorMessage = "O campo é obrigatório !")]
        public string Senha { get; set; }
    }
}
