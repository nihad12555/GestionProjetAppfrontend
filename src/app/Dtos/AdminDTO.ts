interface AdminRegistrationRequestDto {
    fullName: string,
    email: string,
    password: string,
    
  }
  
  interface AdminRegistrationResponseDto {
    fullName: string;
    compteActif: boolean | null;
    password: string;
    id: string;
    userName: string;
    normalizedUserName: string | null;
    email: string;
    normalizedEmail: string | null;
    emailConfirmed: boolean;
    passwordHash: string;
    securityStamp: string;
    concurrencyStamp: string;
    phoneNumber: string | null;
    phoneNumberConfirmed: boolean;
    twoFactorEnabled: boolean;
    lockoutEnd: string | null;
    lockoutEnabled: boolean;
    accessFailedCount: number;
  }
  
  interface AdminAuthenticationRequestDto {
    email: string,
    password: string,
  }
  
  interface AdminInAuthenticationResponseDto {
    FullName: string;
    compteActif: boolean;
    password: string;
    dateDeNaissance: string | Date;
    id: string;
    userName: string;
    normalizedUserName: string | null;
    email: string;
    normalizedEmail: string | null;
    emailConfirmed: boolean;
    passwordHash: string;
    securityStamp: string;
    concurrencyStamp: string;
    phoneNumber: string | null;
    phoneNumberConfirmed: boolean;
    twoFactorEnabled: boolean;
    lockoutEnd: string | null;
    lockoutEnabled: boolean;
    accessFailedCount: number;
  }
  
  interface AdminAuthenticationResponseDto {
    administrator: AdminInAuthenticationResponseDto,
    accessToken : string,
  }
  
  export {
    AdminRegistrationRequestDto,
    AdminRegistrationResponseDto,
    AdminAuthenticationRequestDto,
    AdminAuthenticationResponseDto
  }