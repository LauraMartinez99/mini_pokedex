'use client';

import { usePokemonDetails } from '@/hooks/usePokemon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const typeColors: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-orange-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-cyan-300',
  fighting: 'bg-red-600',
  poison: 'bg-purple-500',
  ground: 'bg-amber-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-amber-700',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-600',
  dark: 'bg-gray-700',
  steel: 'bg-gray-400',
  fairy: 'bg-pink-300',
};

export default function PokemonDetail() {
  const params = useParams();
  const { pokemon, loading, error } = usePokemonDetails(params.name as string);

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="mt-4">
          <Link href="/">
            <Button>Back to List</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-6 w-16" />
            </div>
            <div className="flex gap-2 mt-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="w-full h-64 mb-6" />
            <Separator className="my-6" />
            <div className="space-y-4">
              <div>
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </div>
              <Separator className="my-6" />
              <div>
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-1">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-8" />
                      </div>
                      <Skeleton className="h-2 w-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-32" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="container mx-auto p-4">
        <Alert>
          <AlertTitle>Pokemon not found</AlertTitle>
          <AlertDescription>The Pokemon you&apos;re looking for doesn&apos;t exist.</AlertDescription>
        </Alert>
        <div className="mt-4">
          <Link href="/">
            <Button>Back to List</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
            <span className="text-lg text-gray-500">#{pokemon.id.toString().padStart(3, '0')}</span>
          </div>
          <div className="flex gap-2 mt-2">
            {pokemon.types.map((type) => (
              <Badge
                key={type.type.name}
                className={`${typeColors[type.type.name]} text-white capitalize`}
              >
                {type.type.name}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-64 mb-6">
            <Image
              src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Basic Info</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Height</p>
                  <p>{pokemon.height / 10}m</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Weight</p>
                  <p>{pokemon.weight / 10}kg</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Base Experience</p>
                  <p>{pokemon.base_experience}</p>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h2 className="text-xl font-semibold mb-2">Stats</h2>
              <div className="space-y-4">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name}>
                    <div className="flex justify-between mb-1">
                      <span className="capitalize">{stat.stat.name}</span>
                      <span>{stat.base_stat}</span>
                    </div>
                    <Progress value={(stat.base_stat / 255) * 100} />
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h2 className="text-xl font-semibold mb-2">Abilities</h2>
              <Accordion type="single" collapsible>
                {pokemon.abilities.map((ability) => (
                  <AccordionItem key={ability.ability.name} value={ability.ability.name}>
                    <AccordionTrigger className="capitalize">
                      {ability.ability.name}
                      {ability.is_hidden && (
                        <Badge variant="secondary" className="ml-2">
                          Hidden
                        </Badge>
                      )}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-gray-500">
                        Slot: {ability.slot}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/">
            <Button>Back to List</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
} 