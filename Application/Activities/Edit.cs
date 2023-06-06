using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class Edit
    {
        public class Command:IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _dataContext;

            public Handler(DataContext dataContext) 
            {
                _dataContext = dataContext;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity =  await _dataContext.Activities.FindAsync(request.Activity.Id);

                activity.Title = request.Activity.Title;
                activity.Description = request.Activity.Description;
                activity.Venue = request.Activity.Venue;   
                
                await _dataContext.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
