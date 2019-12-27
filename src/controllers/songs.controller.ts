// @nestjs
import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

// services
import { SongsService } from 'src/services/songs.service';

// interfaces
import { ISongs } from 'src/interfaces/songs.interface';
import { IFavorite } from 'src/interfaces/favorite.interface';

// swagger models
import { Songs } from 'src/swagger-models/songs.model';
import { Favorite } from 'src/swagger-models/favorite.model';
import { Message } from 'src/swagger-models/message.model';

@Controller('songs')
@ApiTags('songs')
export class SongsController {
    constructor(private readonly songsService: SongsService) {}

    @Get()
    @ApiResponse({ status: 200,  type: [Songs]})
    async getSongs(): Promise<ISongs[]> {
        return await this.songsService.getSongs();
    }

    @Get('favorites')
    @ApiResponse({ status: 200, type: [Songs]})
    async getFavorites(): Promise<ISongs[]> {
        return await this.songsService.getFavorites();
    }

    @Put('favorite/update/:id')
    @ApiParam({name: 'id'})
    @ApiBody({type: Favorite})
    @ApiResponse({ status: 200, type: Message})
    async updateFavorite(@Param('id') id: string, @Body() body: IFavorite): Promise<void> {
        return await this.songsService.updateFavorite(id, body);
    }

}