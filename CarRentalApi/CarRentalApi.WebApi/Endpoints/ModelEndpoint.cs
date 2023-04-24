﻿using CarRentalApi.Core.Collections;
using CarRentalApi.Core.DTO;
using CarRentalApi.Services.Repository;
using CarRentalApi.WebApi.Models;
using CarRentalApi.WebApi.Models.Car;
using MapsterMapper;
using Mapster;
using Microsoft.AspNetCore.Mvc;

namespace CarRentalApi.WebApi.Endpoints
{
    public static class ModelEndpoint
    {
        public static WebApplication MapModelEndpoints(this WebApplication app)
        {
            var routeGroupBuilder = app.MapGroup("/api/model");

            routeGroupBuilder.MapGet("/", GetModels)
                           .WithName("GetModels")
                           .Produces<ApiResponse<IList<ModelDto>>>();

            routeGroupBuilder.MapGet("/{slug:regex(^[a-z0-9_-]+$)}/cars", GetCarsByModelSlug)
                           .WithName("GetCarsByModelSlug")
                           .Produces<ApiResponse<PaginationResult<CarDto>>>();

            return app;
        }

        private static async Task<IResult> GetModels(
            IModelRepository repository,
            IMapper mapper)
        {
            var modelList = await repository.GetModelListAsync();

            return Results.Ok(ApiResponse.Success(modelList));
        }

        private static async Task<IResult> GetCarsByModelSlug(
           [FromRoute] string slug,
           [AsParameters] PagingModel pagingModel,
           ICarRepository repository)
        {
            var query = new CarQuery()
            {
                ModelSlug = slug,
                IsActived = true
            };
            
            var cars = await repository.GetPagedCarsQueryAsync(
                cars => cars.ProjectToType<CarDto>(),
                query,
                pagingModel);
            var paginationResult = new PaginationResult<CarDto>(cars);

            return Results.Ok(ApiResponse.Success(paginationResult));
        }
    }
}