---
title: Displaying Objects in Rust
description: |
    Advent of Code 2023 has just kicked off, and I'm going to try something a bit
    different this year, I'm going to try and share useful concepts and patterns
    that play a role in solving each day's puzzle.

    Today, we're looking at how you can render objects to human readable representations
    in Rust, and how you can use that to make debugging your code easier.

date: 2023-12-03T00:00:00.000Z
permalinkPattern: :year/:month/:day/:slug/
categories:
  - development
  - advent-of-code
tags:
  - rust
  - advent-of-code
  - development
---

# Displaying Objects in Rust
Advent of Code 2023 has just kicked off, and I'm going to try something a bit
different this year, I'm going to try and share useful concepts and patterns
that play a role in solving each day's puzzle.

Today, we're looking at how you can render objects to human readable representations
in Rust, and how you can use that to make debugging your code easier.

<!-- more -->

## Rust's `std::fmt` Ecosystem
Rust has a very powerful formatting system, which most folks will be familiar with
thanks to the powerful `format!(...)` macro. It allows you to easily construct strings
from a wide range of types, and is roughly analogous to C#'s `string.Format(...)` or
Python's `f"strings"`.

For example, if we wanted to print the result of a calculation, we could do something
like this:

```rust
println!("The result of {} + {} is {}", 1, 2, 1 + 2);

// Or we could generate a string using the same formatters:
let result = format!("The result of {} + {} is {}", 1, 2, 1 + 2);

// And we could even use the same formatters to write to a stream (like stderr)
writeln!(std::io::stderr(), "The result of {} + {} is {}", 1, 2, 1 + 2);
```

The awesome part about this is that behind the scenes it is all using a common formatting
system, and that system is designed to be extensible! That means that we could easily
add support for formatting our own data types. Let's use the example of a complex number:

```rust
struct Complex {
    real: f64,
    imaginary: f64,
}
```

If we wanted to print this out, we could do something like this:

```rust
let c = Complex { real: 1.0, imaginary: 2.0 };
println!("The complex number is {} + {}i", c.real, c.imaginary);
```

But that's a lot of boilerplate to print these out every time, and it'd be wonderful if
users of our type didn't need to think about this (it'd also be nice if we didn't end up with
`10 + -2i`).

## Implementing `std::fmt::Display`
Fortunately, Rust's formatting system is designed to be easily extended, and that starts with
us deciding whether we're displaying something for general use or for debugging purposes. Let's
start with the former, and implement `std::fmt::Display` for our `Complex` type:

```rust
impl std::fmt::Display for Complex {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        if self.imaginary >= 0.0 {
            write!(f, "{} + {}i", self.real, self.imaginary)
        } else {
            write!(f, "{} - {}i", self.real, -self.imaginary)
        }
    }
}
```

Now, we can simplify our printing code to just:

```rust
let c = Complex { real: 1.0, imaginary: 2.0 };
println!("The complex number is {}", c);
```

## Implementing `std::fmt::Debug`
But what if we want to print out our complex number for debugging purposes? In some cases there's
information about an object which isn't relevant to a user but is useful for someone debugging a
problem with the system.

Rust makes this really easy, swapping out `std::fmt::Display` for `std::fmt::Debug` and using the
`{:?}` formatter instead of `{}` will automatically use the `std::fmt::Debug` implementation for
your type.

```rust
impl std::fmt::Debug for Complex {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        f.debug_struct("Complex")
            .field("real", &self.real)
            .field("imaginary", &self.imaginary)
            .finish()
    }
}
```

For many types where you just want to be able to view its fields, Rust provides the ability to implement
a default `std::fmt::Debug` implementation using the `#[derive(Debug)]` attribute (which results in the
same behaviour as the above implementation):

```rust
#[derive(Debug)]
struct Complex {
    real: f64,
    imaginary: f64,
}
```

## Displaying objects visually
Advent of Code loves to give us visual representations of objects, and it's often useful to be able to
print them back out to confirm that your parsers are working as expected. Let's take the example of a
simple 2D ASCII floor-plan, something like this (yes, it's clear I'm not an architect):

```
#############  #############
#           #  #           #
#              #           #
#           #              #
#           #  #############
##  #########              #
#           #  #           #
#           #  #           #
#              #           #
#           #  #           #
#           #  #           #
############################
```

We might represent this using the following Rust type:

```rust
enum Tile {
    Wall,
    Floor,
}

struct FloorPlan {
    tiles: Vec<Vec<Tile>>,
}
```

And we could implement `std::fmt::Display` for it like this:

```rust
impl std::fmt::Display for Tile {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            Tile::Wall => write!(f, "#"),
            Tile::Floor => write!(f, " "),
        }
    }
}

impl std::fmt::Display for FloorPlan {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        for row in &self.tiles {
            for tile in row {
                write!(f, "{}", tile)?;
            }
            writeln!(f)?;
        }
        Ok(())
    }
}
```

And now, we can simply print our floor plan to the console:

```rust
println!("{}", floor_plan);
```

## Conclusion
I find that being able to visually inspect objects is a really useful tool when debugging, and it's
something that I've found myself using in Advent of Code to validate that my parsers are working as
expected. Hopefully being able to easily encapsulate this logic for your own types is a useful tool
in your toolbox as well!
