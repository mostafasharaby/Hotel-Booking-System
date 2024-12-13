export interface Cart {
    id?: number;
    productId?: number;
    quantity?: number;
    createdAt?: string;
    modifiedAt?: string;
    
  }

  export interface CartDTO {
    reservationId?: number;
    roomId?: number;
    price?: number;   
  }
  
  export interface Room {
    roomID: number;
    roomName: string;
    price: number;
    roomTypeId: number;
    description: string;
    capacity: number;
    size: number;
    services: string;
    imageURL: string;
    roomType?: any; 
  }
  
  export interface ReservedRoom {
    id: number;
    reservationId: number;
    roomId: number;
    room: Room;
    price: number;
  }
  
  export interface Reservation {
    id: number;
    guestId: string | null;
    guest: any | null; 
    paymentMethod: string | null;
    status: string;
    tsCreated: string;
    tsUpdated: string;
    discountPercent: number;
    totalPrice: number;
    roomReserved: ReservedRoom[]; 
  }

  