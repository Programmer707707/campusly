import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";


const isPublicRoute = createRouteMatcher(['/']);
//Here I am protecting only admin's sales page and other two pages are open if i want to protect all of them 
//I should use '/admin(.*)'
//const isAdminRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware((auth, request) =>{
  
  // const isAdminUser = auth().userId === process.env.ADMIN_USER_ID;
  // if(isAdminRoute(request) && !isAdminUser){
  //   return NextResponse.redirect(new URL('/', request.url));
  // }

  if (!isPublicRoute(request)) {
      auth().protect()
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};





