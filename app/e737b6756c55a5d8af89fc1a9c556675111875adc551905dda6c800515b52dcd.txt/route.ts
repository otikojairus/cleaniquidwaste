const VERIFICATION_TOKEN =
  "e737b6756c55a5d8af89fc1a9c556675111875adc551905dda6c800515b52dcd";

export function GET() {
  return new Response(VERIFICATION_TOKEN, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
