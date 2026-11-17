using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace Aiaetar.Api.Services;

public sealed class CloudinaryMedia(IConfiguration configuration)
{
    public bool IsConfigured =>
        !string.IsNullOrWhiteSpace(Name) &&
        !string.IsNullOrWhiteSpace(Key) &&
        !string.IsNullOrWhiteSpace(Secret);

    private string Name =>
        Environment.GetEnvironmentVariable("CLOUDINARY_CLOUD_NAME")
        ?? configuration["Cloudinary:CloudName"]
        ?? "";

    private string Key =>
        Environment.GetEnvironmentVariable("CLOUDINARY_API_KEY")
        ?? configuration["Cloudinary:ApiKey"]
        ?? "";

    private string Secret =>
        Environment.GetEnvironmentVariable("CLOUDINARY_API_SECRET")
        ?? configuration["Cloudinary:ApiSecret"]
        ?? "";

    private Cloudinary Client => new(new Account(Name, Key, Secret));

    public async Task<UploadedMedia> UploadAsync(Stream stream, string fileName, bool video)
    {
        if (!IsConfigured) throw new InvalidOperationException("Cloudinary is not configured");

        if (video)
        {
            var upload = new VideoUploadParams
            {
                File = new FileDescription(fileName, stream),
                Folder = "aiaetar/gallery",
            };
            var result = await Client.UploadAsync(upload);
            if (result.Error != null) throw new InvalidOperationException(result.Error.Message);
            return new UploadedMedia(result.PublicId, result.SecureUrl.ToString(), result.Width, result.Height, result.Format);
        }

        var image = new ImageUploadParams
        {
            File = new FileDescription(fileName, stream),
            Folder = "aiaetar/gallery",
        };
        var uploaded = await Client.UploadAsync(image);
        if (uploaded.Error != null) throw new InvalidOperationException(uploaded.Error.Message);
        return new UploadedMedia(uploaded.PublicId, uploaded.SecureUrl.ToString(), uploaded.Width, uploaded.Height, uploaded.Format);
    }

    public async Task DeleteAsync(string publicId, string type)
    {
        if (!IsConfigured) return;
        var deletion = new DeletionParams(publicId)
        {
            ResourceType = type == "video" ? ResourceType.Video : ResourceType.Image,
        };
        await Client.DestroyAsync(deletion);
    }
}

public record UploadedMedia(string PublicId, string SecureUrl, int Width, int Height, string Format);
