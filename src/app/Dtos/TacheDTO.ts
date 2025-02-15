interface TacheDto {
  titre: string;
  description: string;
  EstTerminee:boolean;
  dateLimite: Date;
  responsable: string;
  projetId:number;
    
  }
  
  interface CreateTacheDTO {
    titre: string;
    description: string;
    EstTerminee:boolean;
    dateLimite: Date;
    responsable: string;
    projetId:number;
    
  }
  
  interface UpdateTacheDto {
  titre: string;
  description: string;
  EstTerminee:boolean;
  dateLimite: Date;
  responsable: string;
  projetId:number;
  }
  
  export {
    TacheDto,
    CreateTacheDTO,
    UpdateTacheDto
  };
  

  
  