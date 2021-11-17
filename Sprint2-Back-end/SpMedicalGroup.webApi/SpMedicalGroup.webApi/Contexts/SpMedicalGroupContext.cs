using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using SpMedicalGroup.webApi.Domains;

#nullable disable

namespace SpMedicalGroup.webApi.Contexts
{
    public partial class SpMedicalGroupContext : DbContext
    {
        public SpMedicalGroupContext()
        {
        }

        public SpMedicalGroupContext(DbContextOptions<SpMedicalGroupContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Agendamento> Agendamentos { get; set; }
        public virtual DbSet<Clinica> Clinicas { get; set; }
        public virtual DbSet<Especialidade> Especialidades { get; set; }
        public virtual DbSet<ImagemUsuario> ImagemUsuarios { get; set; }
        public virtual DbSet<Medico> Medicos { get; set; }
        public virtual DbSet<Prontuario> Prontuarios { get; set; }
        public virtual DbSet<Situacao> Situacaos { get; set; }
        public virtual DbSet<TipoUsuario> TipoUsuarios { get; set; }
        public virtual DbSet<Usuario> Usuarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(@"Data Source= DESKTOP-DHSRSVI\SQLEXPRESS; initial catalog=Sp_medical_group; user Id=sa; pwd=senai@132;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Latin1_General_CI_AS");

            modelBuilder.Entity<Agendamento>(entity =>
            {
                entity.HasKey(e => e.IdAgendamento)
                    .HasName("PK__agendame__943BE63EBED5A253");

                entity.ToTable("agendamento");

                entity.Property(e => e.IdAgendamento).HasColumnName("idAgendamento");

                entity.Property(e => e.DataConsulta)
                    .HasColumnType("datetime")
                    .HasColumnName("dataConsulta");

                entity.Property(e => e.Descricao)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("descricao");

                entity.Property(e => e.IdMedico).HasColumnName("idMedico");

                entity.Property(e => e.IdProntuario).HasColumnName("idProntuario");

                entity.Property(e => e.IdSituacao).HasColumnName("idSituacao");

                entity.HasOne(d => d.IdMedicoNavigation)
                    .WithMany(p => p.Agendamentos)
                    .HasForeignKey(d => d.IdMedico)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__agendamen__idMed__6477ECF3");

                entity.HasOne(d => d.IdProntuarioNavigation)
                    .WithMany(p => p.Agendamentos)
                    .HasForeignKey(d => d.IdProntuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__agendamen__idPro__656C112C");

                entity.HasOne(d => d.IdSituacaoNavigation)
                    .WithMany(p => p.Agendamentos)
                    .HasForeignKey(d => d.IdSituacao)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__agendamen__idSit__66603565");
            });

            modelBuilder.Entity<Clinica>(entity =>
            {
                entity.HasKey(e => e.IdClinica)
                    .HasName("PK__clinica__C73A6055266C9FED");

                entity.ToTable("clinica");

                entity.HasIndex(e => e.Cnpj, "UQ__clinica__35BD3E4850DE5BFD")
                    .IsUnique();

                entity.HasIndex(e => e.RazaoSocial, "UQ__clinica__9BF93A30934BAAA2")
                    .IsUnique();

                entity.HasIndex(e => e.NomeFantasia, "UQ__clinica__E7ADFC70E6D1FA6B")
                    .IsUnique();

                entity.Property(e => e.IdClinica).HasColumnName("idClinica");

                entity.Property(e => e.Cnpj)
                    .IsRequired()
                    .HasMaxLength(18)
                    .IsUnicode(false)
                    .HasColumnName("cnpj")
                    .IsFixedLength(true);

                entity.Property(e => e.HorarioFuncionamento).HasColumnName("horarioFuncionamento");

                entity.Property(e => e.NomeFantasia)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nomeFantasia");

                entity.Property(e => e.RazaoSocial)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("razaoSocial");
            });

            modelBuilder.Entity<Especialidade>(entity =>
            {
                entity.HasKey(e => e.IdEspecialidade)
                    .HasName("PK__especial__40969805251994A0");

                entity.ToTable("especialidade");

                entity.HasIndex(e => e.TituloEspecialidade, "UQ__especial__7CBCFBB877193CF0")
                    .IsUnique();

                entity.Property(e => e.IdEspecialidade).HasColumnName("idEspecialidade");

                entity.Property(e => e.TituloEspecialidade)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("tituloEspecialidade");
            });

            modelBuilder.Entity<ImagemUsuario>(entity =>
            {
                entity.HasKey(e => e.IdImagem)
                    .HasName("PK__imagemUs__EA9A7137F0A2F18B");

                entity.ToTable("imagemUsuario");

                entity.HasIndex(e => e.IdUsuario, "UQ__imagemUs__645723A7FC5EB608")
                    .IsUnique();

                entity.Property(e => e.IdImagem).HasColumnName("idImagem");

                entity.Property(e => e.Binario)
                    .IsRequired()
                    .HasColumnName("binario");

                entity.Property(e => e.DataInclusao)
                    .HasColumnType("datetime")
                    .HasColumnName("data_inclusao")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.MimeType)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("mimeType");

                entity.Property(e => e.NomeArquivo)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false)
                    .HasColumnName("nomeArquivo");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithOne(p => p.ImagemUsuario)
                    .HasForeignKey<ImagemUsuario>(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__imagemUsu__idUsu__70DDC3D8");
            });

            modelBuilder.Entity<Medico>(entity =>
            {
                entity.HasKey(e => e.IdMedico)
                    .HasName("PK__medico__4E03DEBABACAF652");

                entity.ToTable("medico");

                entity.HasIndex(e => e.Crm, "UQ__medico__D836F7D1D757A514")
                    .IsUnique();

                entity.Property(e => e.IdMedico).HasColumnName("idMedico");

                entity.Property(e => e.Crm)
                    .IsRequired()
                    .HasMaxLength(7)
                    .IsUnicode(false)
                    .HasColumnName("crm");

                entity.Property(e => e.IdClinica).HasColumnName("idClinica");

                entity.Property(e => e.IdEspecialidade).HasColumnName("idEspecialidade");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.NomeMedico)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("nomeMedico");

                entity.HasOne(d => d.IdClinicaNavigation)
                    .WithMany(p => p.Medicos)
                    .HasForeignKey(d => d.IdClinica)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__medico__idClinic__5BE2A6F2");

                entity.HasOne(d => d.IdEspecialidadeNavigation)
                    .WithMany(p => p.Medicos)
                    .HasForeignKey(d => d.IdEspecialidade)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__medico__idEspeci__5AEE82B9");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Medicos)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__medico__idUsuari__5CD6CB2B");
            });

            modelBuilder.Entity<Prontuario>(entity =>
            {
                entity.HasKey(e => e.IdProntuario)
                    .HasName("PK__prontuar__41651E52594A746F");

                entity.ToTable("prontuario");

                entity.HasIndex(e => e.Rg, "UQ__prontuar__32143310CD6AEB14")
                    .IsUnique();

                entity.HasIndex(e => e.Cpf, "UQ__prontuar__D836E71FBA82056C")
                    .IsUnique();

                entity.Property(e => e.IdProntuario).HasColumnName("idProntuario");

                entity.Property(e => e.Cpf)
                    .IsRequired()
                    .HasMaxLength(14)
                    .IsUnicode(false)
                    .HasColumnName("cpf")
                    .IsFixedLength(true);

                entity.Property(e => e.DataNascimento)
                    .HasColumnType("date")
                    .HasColumnName("dataNascimento");

                entity.Property(e => e.EnderecoProntuario)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("enderecoProntuario");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.Rg)
                    .IsRequired()
                    .HasMaxLength(12)
                    .IsUnicode(false)
                    .HasColumnName("rg")
                    .IsFixedLength(true);

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Prontuarios)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__prontuari__idUsu__619B8048");
            });

            modelBuilder.Entity<Situacao>(entity =>
            {
                entity.HasKey(e => e.IdSituacao)
                    .HasName("PK__situacao__12AFD197F5539DC7");

                entity.ToTable("situacao");

                entity.Property(e => e.IdSituacao)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("idSituacao");

                entity.Property(e => e.EstadoSituacao)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("estadoSituacao");
            });

            modelBuilder.Entity<TipoUsuario>(entity =>
            {
                entity.HasKey(e => e.IdTipoUsuario)
                    .HasName("PK__tipoUsua__03006BFF9E15BDB8");

                entity.ToTable("tipoUsuario");

                entity.Property(e => e.IdTipoUsuario).HasColumnName("idTipoUsuario");

                entity.Property(e => e.TituloUsuario)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("tituloUsuario");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.IdUsuario)
                    .HasName("PK__usuario__645723A69496CF47");

                entity.ToTable("usuario");

                entity.HasIndex(e => e.Email, "UQ__usuario__AB6E61645D386005")
                    .IsUnique();

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(256)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.IdTipoUsuario).HasColumnName("idTipoUsuario");

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("nome");

                entity.Property(e => e.Senha)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasColumnName("senha");

                entity.HasOne(d => d.IdTipoUsuarioNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.IdTipoUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__usuario__idTipoU__5629CD9C");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
