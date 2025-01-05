export function MyDesignCard({ name }: { name: string }) {
  return (
    <div className='card card-image-cover'>
      <img src='/plan1.jpg' alt='' />
      <div className='card-body px-6 pb-8 pt-4'>
        <h2 className='card-header'>{name}</h2>
        <div className='flex w-full overflow-x-auto'>
          <table className='table table-compact table-zebra max-w-full'>
            <tbody>
              <tr>
                <th>Plot Dimension</th>
                <td>
                  <p className='text-right'>10 ft x 12 ft</p>
                </td>
              </tr>
              <tr>
                <th>Room Count</th>
                <td>
                  <p className='text-right'>3</p>
                </td>
              </tr>
              <tr>
                <th>Created At</th>
                <td>
                  <p className='text-right'>August 11, 2024</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='card-footer mt-4'>
          <button className='btn-secondary btn w-full'>View</button>
        </div>
      </div>
    </div>
  );
}
