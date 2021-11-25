import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { PlentinaService } from './plentina.service'


export interface ShapeDTO {
  x: number;
  y: number;
  radius?: number;
  width?: number;
  height?: number;
}

export interface CollideShapesRequest {
  firstShape: ShapeDTO;
  secondShape: ShapeDTO;
}

export interface CollideShapesResponse {
  collides: boolean;
  firstShape: ShapeDTO;
  secondShape: ShapeDTO;
}

@Controller()
export class PlentinaController {
  constructor(private readonly plentinaService: PlentinaService) {}

  @Get()
  healthCheck(@Res({ passthrough: true }) res: Response): any {
    
    
    
    try {
      res.status(HttpStatus.OK);
      return { name: this.plentinaService.healthCheck() };
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST);
      return { error: 'Did you forget to return your name?' };
    }
  }
  @Get('/shape')
  findAll(): CollideShapesRequest {
    const element : CollideShapesRequest = {
      firstShape : {
        x : 12,
        y : 13,
        width : 14,
        height : 15,
      },
      secondShape : {
        x : 14,
        y : 15,
        width : 9,
        height : 7
      }

    }
    console.log("Executing findAll fun")
    return element
    
  }
  
  @Post('/shape')
  collideShapes(@Body() req: CollideShapesRequest, @Res() res: Response) {
    try {
      const response: CollideShapesResponse =
        this.plentinaService.doShapesCollide(req);
      console.log("calling do shapes collide");
      res.status(HttpStatus.OK).json(response);
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).json(e);
    }
  }
}
