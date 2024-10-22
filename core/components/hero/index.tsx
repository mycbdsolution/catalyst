import { BcImage } from '../bc-image';
import { Container } from '~/components/container';
import { Gradient } from '~/components/gradient';



export const Hero = () => (

  <div className="relative">
  <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-inset ring-black/5" />
  <Container className="relative">
   
    <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 md:pb-48 md:pt-32">
     
    <h1 className="font-display text-balance text-6xl/[0.9] font-black tracking-tighter text-neutral-50 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
    Premium plant based pain relief.
      </h1>



        <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
         Anim aute id magna aliqua a non deserunt sunt irure qui lorem 
        cupidatat commodo.
      </p>
  
    </div>
  </Container>
</div>
      
  );