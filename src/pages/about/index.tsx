import { Card, CardFooter, CardHeader, LargeTitle } from '@fluentui/react-components';

export default function AboutPage() {
  return (
    <main style={{ padding: 20 }}>
      <LargeTitle as="h1">About Page</LargeTitle>
      <Card style={{ maxWidth: 640, margin: '20px auto' }}>
        <CardHeader header={'About A'} />
        <CardFooter>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit placeat hic facere deserunt
          corporis delectus unde dolores quis quisquam fugiat autem, itaque, incidunt illo iste
          debitis voluptatem reiciendis officia in suscipit praesentium! Veritatis commodi at
          accusamus dolorum laudantium atque dolores magni quam natus, eum architecto modi
          perspiciatis animi itaque, praesentium sed doloremque pariatur tenetur, provident dicta!
          Natus vero animi consequuntur nisi praesentium qui accusantium. Veniam sequi sapiente
          officia tempore excepturi numquam, rem earum voluptas molestias. Facere commodi saepe quis
          aspernatur dignissimos minima adipisci error? Earum, repellat laborum rerum rem quo
          adipisci cupiditate ad facilis eos, inventore odio corrupti dolore dicta?
        </CardFooter>
      </Card>
      <Card style={{ maxWidth: 320, margin: '40px auto' }}>
        <CardHeader header={'About B'} />
        <CardFooter>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium placeat officiis
          dolores. Eius facilis illum laborum ex dignissimos ea tempore. Ipsum fuga cupiditate odio
          fugiat error iusto cumque nostrum, dolore delectus dicta. Totam enim ab voluptas dolorem
          minus repellat necessitatibus, perferendis accusantium reiciendis error laborum rerum
          dolore cum architecto reprehenderit dolorum sunt corporis? Aut quasi doloribus laboriosam
          magni libero maxime quidem blanditiis labore, debitis, sequi accusamus! Quia tenetur cum,
          nostrum atque aut laborum aperiam consequuntur molestiae dolorum id sint ab quas vitae
          eius iure voluptates. Porro inventore dolorem voluptatibus ipsa quibusdam, corrupti
          maiores cumque consectetur eius alias aperiam exercitationem minima.
        </CardFooter>
      </Card>
      <Card style={{ maxWidth: 640, margin: '20px auto' }}>
        <CardHeader header={'About C'} />
        <CardFooter>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti nihil quibusdam
          doloribus quo deleniti impedit libero ad vel praesentium inventore dicta laudantium error
          nam maxime delectus nisi voluptatum porro ut, ullam vitae harum! Adipisci autem ipsa ad
          reiciendis suscipit similique. Vel accusamus corrupti perspiciatis fugiat, harum
          laudantium quas iste hic asperiores officia fuga quasi minima suscipit eveniet eum culpa
          doloribus ipsam, explicabo repudiandae cumque voluptates esse! Et incidunt mollitia velit?
          Labore expedita tempore consectetur consequatur illo vitae magnam eius alias? Et dicta,
          eos quae alias vel maxime tenetur quis veritatis illum quibusdam nam provident minus?
          Necessitatibus eius dolores itaque magnam?
        </CardFooter>
      </Card>
    </main>
  );
}
