import Image from "next/image"

export default function HistoryPage() {
  return (
    <div className="bg-white min-h-screen pt-24">
      <div className="container px-4 md:px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#0A0F2C] mb-4 text-center">
            Nuestra Historia
          </h1>
          <p className="text-lg text-[#0A0F2C]/70 mb-12 text-center">
            El viaje de Velmor desde su concepción hasta convertirse en símbolo de elegancia silenciosa.
          </p>

          <div className="prose prose-lg max-w-none text-[#0A0F2C]/80">
            <p>
              Velmor nació de una pasión por la artesanía tradicional y un deseo de crear accesorios que perduren en el
              tiempo. Nuestra historia es un viaje de descubrimiento, dedicación y un compromiso inquebrantable con la
              excelencia.
            </p>

            <div className="my-12 relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=1200"
                alt="Taller de artesanía Velmor"
                fill
                className="object-cover"
              />
            </div>

            <h2 className="font-playfair text-2xl font-bold text-[#0A0F2C] mt-8 mb-4">Los orígenes</h2>
            <p>
              Todo comenzó en un pequeño taller familiar en 2015, cuando nuestro fundador, Alejandro Velmor, decidió
              combinar su formación en diseño con las técnicas artesanales que había aprendido de su abuelo, un maestro
              marroquinero con más de cinco décadas de experiencia.
            </p>
            <p>
              Inspirado por la filosofía del "menos es más" y fascinado por la nobleza del cuero como material,
              Alejandro se propuso crear piezas que fueran a la vez funcionales y atemporales, capaces de mejorar con el
              paso del tiempo, como una buena historia que se enriquece con cada nueva lectura.
            </p>

            <h2 className="font-playfair text-2xl font-bold text-[#0A0F2C] mt-8 mb-4">La filosofía Velmor</h2>
            <p>
              En un mundo dominado por el consumo rápido y las tendencias efímeras, Velmor se posiciona como un oasis de
              permanencia. Creemos firmemente que los objetos que nos acompañan en nuestro día a día deberían ser
              especiales, con personalidad propia y capaces de resistir no solo el desgaste físico, sino también los
              cambios de moda.
            </p>
            <p>
              Cada pieza Velmor está diseñada para ser un compañero silencioso pero significativo en la vida de quien la
              posee. No buscamos que nuestros productos griten para llamar la atención, sino que susurren su valor a
              través de detalles sutiles, materiales excepcionales y una funcionalidad impecable.
            </p>

            <div className="my-12 grid grid-cols-2 gap-4">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="Proceso de corte del cuero"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="Detalle de costura a mano"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <h2 className="font-playfair text-2xl font-bold text-[#0A0F2C] mt-8 mb-4">Artesanía y tradición</h2>
            <p>
              En Velmor, el proceso de creación es tan importante como el resultado final. Cada pieza pasa por las manos
              de artesanos expertos que han perfeccionado su oficio durante años. Desde la selección del cuero hasta el
              último punto de costura, cada etapa se realiza con meticulosa atención al detalle.
            </p>
            <p>
              Utilizamos técnicas tradicionales que han sido transmitidas de generación en generación, combinadas con
              innovaciones contemporáneas que nos permiten mejorar la durabilidad y funcionalidad de nuestros productos
              sin comprometer su esencia artesanal.
            </p>

            <h2 className="font-playfair text-2xl font-bold text-[#0A0F2C] mt-8 mb-4">Mirando al futuro</h2>
            <p>
              A medida que Velmor crece, mantenemos intactos nuestros valores fundamentales: excelencia en la artesanía,
              diseño atemporal y un profundo respeto por los materiales que utilizamos. Nuestro compromiso es seguir
              creando piezas que no solo cumplan una función, sino que enriquezcan la vida de quienes las eligen.
            </p>
            <p>
              Creemos que la verdadera sostenibilidad comienza con la creación de productos que están hechos para durar,
              que envejecen con gracia y que forman parte de la historia personal de cada cliente. Esta es nuestra
              visión para el futuro: continuar siendo guardianes de una tradición artesanal que celebra la belleza de lo
              perdurable en un mundo cada vez más efímero.
            </p>

            <div className="mt-12 text-center italic">
              "En Velmor no creamos simples accesorios; creamos compañeros silenciosos para el viaje de la vida."
              <br />— Alejandro Velmor, Fundador
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
