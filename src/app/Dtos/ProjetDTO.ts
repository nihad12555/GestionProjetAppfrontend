
  interface ProjectDto {
    id: number;
    name: string;
    description?: string;
    status: string;
    startDate: string;
    endDate: string;
    priority: string;
    
  }
  
  interface CreateProjectDto {
    name: string;
    description?: string;
    status: string;
    startDate: string;
    endDate: string;
    priority: string;
    
  }
  
  interface UpdateProjectDto {
    name?: string;
    description?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    priority?: string;
  }
  
  export {
    ProjectDto,
    CreateProjectDto,
    UpdateProjectDto
  };
  

  
  