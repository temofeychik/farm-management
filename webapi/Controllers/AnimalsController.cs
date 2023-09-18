using Microsoft.AspNetCore.Mvc;
using webapi.Models;

namespace webapi.Controllers;

[ApiController]
[Route("[controller]")]
public class AnimalsController : ControllerBase
{

    private readonly ILogger<AnimalsController> _logger;

    private static List<Animal> animals = new List<Animal>();

    private static int concatenator = 1;

    public AnimalsController(ILogger<AnimalsController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<Animal> Get()
    {
        return animals;
    }

    [HttpPost]
    public IActionResult Post([FromBody] Animal animal)
    {
        if (IsNotUniqueOrEmptyName(animal.Name))
        {
            return BadRequest("Animal name should be unique or not empty. Please rename it");
        }
        animal.Id = concatenator;
        animals.Add(animal);
        concatenator++;
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        animals.RemoveAll(x => x.Id == id);
        return NoContent();
    }

    private bool IsNotUniqueOrEmptyName(string name)
    {
        if (!string.IsNullOrEmpty(name))
        {
            return animals.Any(x => x.Name == name);
        }
        return true;
    }
}
